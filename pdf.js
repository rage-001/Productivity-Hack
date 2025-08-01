document.addEventListener('DOMContentLoaded', function () {
    const pdfList = document.getElementById('pdfList');
    const uploadButton = document.getElementById('uploadButton');

    // Initialize an array to store PDFs in memory
    let pdfs = [];

    // Upload PDF function
    uploadButton.addEventListener('click', function () {
        const pdfFile = document.getElementById('pdfFile').files[0];
        const pdfTitle = document.getElementById('pdfTitle').value;

        if (pdfFile && pdfTitle) {
            const pdfUrl = URL.createObjectURL(pdfFile);
            const pdfData = { title: pdfTitle, url: pdfUrl, file: pdfFile.name };

            // Add the new PDF to the array
            pdfs.push(pdfData);

            // Render the updated list of PDFs
            renderPdfs();
        } else {
            alert('Please select a PDF and enter a title.');
        }
    });

    // Function to render the list of PDFs
    function renderPdfs() {
        pdfList.innerHTML = '';
        pdfs.forEach((pdf, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${pdf.title}
                <button onclick="viewPdf('${pdf.url}')">View</button>
                <button onclick="downloadPdf('${pdf.url}', '${pdf.file}')">Download</button>
                <button onclick="editPdf(${index}, '${pdf.title}')">Edit</button>
                <button onclick="deletePdf(${index})">Delete</button>
            `;
            pdfList.appendChild(listItem);
        });
    }

    // View PDF function
    window.viewPdf = function (url) {
        window.open(url, '_blank');
    };

    // Download PDF function
    window.downloadPdf = function (url, filename) {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
    };

    // Edit PDF title function
    window.editPdf = function (index, currentTitle) {
        const newTitle = prompt('Enter new title:', currentTitle);
        if (newTitle) {
            pdfs[index].title = newTitle;
            renderPdfs();
        }
    };

    // Delete PDF function
    window.deletePdf = function (index) {
        if (confirm('Are you sure you want to delete this PDF?')) {
            pdfs.splice(index, 1); // Remove PDF from array
            renderPdfs();
        }
    };
});
