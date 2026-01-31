const express = require('express');
const cors = require('cors'); // Make sure you have: npm install cors
const app = express();

app.use(cors()); // <--- THIS MUST BE ABOVE YOUR ROUTES
app.use(express.json());

// 🏛️ Comprehensive University Database
const universities = [
    { id: 1, name: "Stanford University", country: "USA", minGPA: 9.8, cost: 60000 },
    { id: 2, name: "Harvard University", country: "USA", minGPA: 9.8, cost: 58000 },
    { id: 3, name: "MIT", country: "USA", minGPA: 9.7, cost: 55000 },
    { id: 4, name: "UC Berkeley", country: "USA", minGPA: 9.7, cost: 45000 },
    { id: 5, name: "Oxford University", country: "UK", minGPA: 9.7, cost: 40000 },
    { id: 6, name: "Cambridge University", country: "UK", minGPA: 9.7, cost: 42000 },
    { id: 7, name: "Technical University of Munich", country: "Germany", minGPA: 9.0, cost: 1000 },
    { id: 8, name: "University of Toronto", country: "Canada", minGPA: 9.0, cost: 45000 },
    { id: 9, name: "National University of Singapore", country: "Singapore", minGPA: 8.0, cost: 30000 },
    { id: 10, name: "University of Melbourne", country: "Australia", minGPA: 8.0, cost: 35000 },
    { id: 11, name: "ETH Zurich", country: "Switzerland", minGPA: 8.0, cost: 2000 },
    { id: 12, name: "McGill University", country: "Canada", minGPA: 8.0, cost: 38000 },
    { id: 13, name: "Imperial College London", country: "UK", minGPA: 7.0, cost: 35000 },
    { id: 14, name: "Princeton University", country: "USA", minGPA: 7.0, cost: 57000 },
    { id: 15, name: "Yale University", country: "USA", minGPA: 7.0, cost: 59000 },
    { id: 16, name: "Columbia University", country: "USA", minGPA: 7.0, cost: 62000 },
    { id: 17, name: "Heidelberg University", country: "Germany", minGPA: 7.0, cost: 1500 },
    { id: 18, name: "University of Tokyo", country: "Japan", minGPA: 7.0, cost: 10000 },
    { id: 19, name: "Delft University of Technology", country: "Netherlands", minGPA: 7.0, cost: 15000 },
    { id: 20, name: "University of Sydney", country: "Australia", minGPA: 7.0, cost: 38000 },
    { id: 21, name: "UBC", country: "Canada", minGPA: 7.0, cost: 40000 },
    { id: 22, name: "King's College London", country: "UK", minGPA: 6.5, cost: 33000 },
    { id: 23, name: "Seoul National University", country: "South Korea", minGPA: 6.5, cost: 12000 },
    { id: 24, name: "Humboldt University of Berlin", country: "Germany", minGPA: 6.5, cost: 500 },
    { id: 25, name: "Georgia Tech", country: "USA", minGPA: 6.5, cost: 33000 },
    { id: 26, name: "University of Edinburgh", country: "UK", minGPA: 6.5, cost: 30000 },
    { id: 27, name: "University of Waterloo", country: "Canada", minGPA: 6.5, cost: 42000 },
    { id: 28, name: "Lund University", country: "Sweden", minGPA: 6.0, cost: 14000 },
    { id: 29, name: "University of Hong Kong", country: "Hong Kong", minGPA: 6.0, cost: 22000 },
    { id: 30, name: "Paris-Saclay University", country: "France", minGPA: 6.0, cost: 4000 },
    { id: 31, name: "Kyoto University", country: "Japan", minGPA: 6.0, cost: 9000 },
    { id: 32, name: "University of Manchester", country: "UK", minGPA: 6.0, cost: 28000 }
];

// --- 🧠 Route: Recommendations ---
app.post('/api/recommendations', (req, res) => {
    try {
        const { gpa, budget } = req.body;
        
        const userGPA = parseFloat(gpa); 
        const userBudget = parseFloat(budget);

        if (isNaN(userGPA) || isNaN(userBudget)) {
            return res.status(400).json({ message: "Invalid GPA or Budget format" });
        }

        const filtered = universities
            .filter(uni => uni.cost <= userBudget)
            .map(uni => {
                let risk = "Safe"; // Changed from riskLevel to 'risk' to match Frontend
                
                if (userGPA < uni.minGPA - 1.0) {
                    risk = "Dream";
                } else if (userGPA < uni.minGPA) {
                    risk = "Target";
                }

                return { ...uni, risk };
            });

        res.json(filtered);
    } catch (error) {
        res.status(500).json({ message: "Server Error during recommendation" });
    }
});

// --- 🔒 Route: Generate Tasks (Updated name for perfect alignment) ---
app.post('/api/generate-tasks', (req, res) => {
    const { university } = req.body;

    if (!university) {
        return res.status(400).json({ message: "No university selected" });
    }
    
    // Logic-based task generation
    const tasks = [
        { id: 1, text: `Draft personal statement specifically for ${university.name}`, status: 'pending' },
        { id: 2, text: `Obtain official transcripts for ${university.country} equivalency check`, status: 'pending' },
        { id: 3, text: `Book IELTS/TOEFL exam for ${university.name} requirements`, status: 'pending' },
        { id: 4, text: `Prepare financial sponsorship documents for ${university.country} visa`, status: 'pending' }
    ];

    // Add extra task for expensive/prestigious schools
    if (university.cost > 50000) {
        tasks.push({ id: 5, text: "Apply for external merit-based scholarships", status: 'pending' });
    }

    res.json(tasks); // Returning the array directly as expected by Dashboard.js
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));