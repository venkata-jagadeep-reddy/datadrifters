document.addEventListener('DOMContentLoaded', () => {
    const enrollmentForm = document.getElementById('enrollment-form');
    const studentsList = document.getElementById('students');

    // Fetch enrolled students
    const fetchStudents = async () => {
        try {
            const response = await fetch('/students');
            if (!response.ok) throw new Error('Failed to fetch students');
            const students = await response.json();

            studentsList.innerHTML = '';
            students.forEach(student => {
                const li = document.createElement('li');
                li.textContent = `${student.name} (${student.email})`;
                studentsList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    // Enroll a new student
    enrollmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(enrollmentForm);

        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
        };

        try {
            const response = await fetch('/enroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                enrollmentForm.reset();
                fetchStudents();
            } else {
                console.error('Failed to enroll student');
            }
        } catch (error) {
            console.error('Error enrolling student:', error);
        }
    });

    // Initial fetch
    fetchStudents();
});
