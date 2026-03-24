// Student Manager Program

// Array of student objects
let students = [
    {
        name: "Pranav",
        marks: [85, 90, 78]
    },
    {
        name: "Rahul",
        marks: [70, 88, 92]
    },
    {
        name: "Ananya",
        marks: [95, 80, 85]
    }
];

// Function to calculate average
function calculateAverage(marks) {
    let total = 0;

    for (let i = 0; i < marks.length; i++) {
        total += marks[i];
    }

    return total / marks.length;
}

// Display student results
for (let i = 0; i < students.length; i++) {
    let student = students[i];
    let avg = calculateAverage(student.marks);

    console.log("Name:", student.name);
    console.log("Marks:", student.marks);
    console.log("Average:", avg.toFixed(2));
    console.log("----------------------");
}