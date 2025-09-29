document.addEventListener('DOMContentLoaded', function () {
    const leaveForm = document.getElementById('leaveForm');
    const leaveRequestsTableBody = document.getElementById('leaveRequestsTableBody');

    // Submit Leave Request
    if (leaveForm) {
        leaveForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const fileInput = document.getElementById('proof');
            const file = fileInput.files[0];

            const reader = new FileReader();
            reader.onloadend = function () {
                const leaveRequest = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    reason: document.getElementById('reason').value,
                    startDate: document.getElementById('startDate').value,
                    endDate: document.getElementById('endDate').value,
                    proof: reader.result, // Save image as Base64 string
                    status: "Pending"
                };

                let leaveRequests = JSON.parse(localStorage.getItem('leaveRequests')) || [];
                leaveRequests.push(leaveRequest);
                localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests));

                document.getElementById('success').textContent = "Leave request submitted successfully!";
                leaveForm.reset();
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        });
    }

    // Display Leave Requests in Admin View
    if (leaveRequestsTableBody) {
        let leaveRequests = JSON.parse(localStorage.getItem('leaveRequests')) || [];

        leaveRequests.forEach(request => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${request.name}</td>
                <td>${request.email}</td>
                <td>${request.reason}</td>
                <td>${request.startDate}</td>
                <td>${request.endDate}</td>
                <td><img src="${request.proof}" class="thumbnail" onclick="showFullImage('${request.proof}')"></td>
                <td>${request.status}</td>
            `;

            leaveRequestsTableBody.appendChild(row);
        });
    }
});

// Function to display the full image in a new window or modal
function showFullImage(imageSrc) {
    const newWindow = window.open();
    newWindow.document.write(`<img src="${imageSrc}" style="width:100%">`);
}
