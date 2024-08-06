// Función para rellenar y descargar el PDF rellenable
async function generateAndDownloadPdf(data) {
    const url = 'Documento tipo Acta de Entrega de Equipos Informáticos.pdf'; // Reemplaza con la ruta de tu plantilla PDF rellenable
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

    const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();

    // Accede a los campos del formulario y establece sus valores
    form.getTextField('NOMBRE RECEPTOR').setText(data.fullname);
    form.getTextField('RUT').setText(data.rut);
    form.getTextField('FECHA').setText(data.fechai);
    form.getTextField('FechaDEV').setText(data.fechaf);
    form.getTextField('NOMBRE ACTIVO').setText(data.Ename);
    form.getTextField('modelo').setText(data.Emodel);
    form.getTextField('MARCA').setText(data.Ebrand);
    form.getTextField('SERIAL NUMBER').setText(data.Eid);

    // Guarda el PDF modificado
    const pdfBytes = await pdfDoc.save();

    // Crear un enlace de descarga y hacer clic en él para iniciar la descarga
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'documento_rellenado.pdf'; // Nombre del archivo descargado
    link.click();
}

// Captura los datos del formulario y llama a la función para generar y descargar el PDF
document.getElementById('generatePdf').addEventListener('click', () => {
    const fullname = document.getElementById('fullname');
    const rut = document.getElementById('rut');
    const fechai = document.getElementById('fechai');
    const fechaf = document.getElementById('fechaf');
    const Ename = document.getElementById('Ename');
    const Emodel = document.getElementById('Emodel');
    const Ebrand = document.getElementById('Ebrand');
    const Eid = document.getElementById('Eid');

    if (!fullname || !rut || !fechai || !fechaf || !Ename || !Emodel || !Ebrand || !Eid) {
        alert("Por favor, completa todos los campos del formulario.");
        return;
    }

    const data = {
        fullname: fullname.value,
        rut: rut.value,
        fechai: fechai.value,
        fechaf: fechaf.value,
        Ename: Ename.value,
        Emodel: Emodel.value,
        Ebrand: Ebrand.value,
        Eid: Eid.value
    };

    generateAndDownloadPdf(data);
});
