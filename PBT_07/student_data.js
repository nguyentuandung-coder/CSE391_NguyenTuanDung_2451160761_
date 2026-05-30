const students = [
  { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
  { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
  { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
  { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
  { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
  { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
  { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
  { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

let countGioi = 0;
let countKha = 0;
let countTrungBinh = 0;
let countYeu = 0;

let maxStudent = null;
let minStudent = null;

let totalMath = 0;
let totalPhysics = 0;
let totalCs = 0;

let totalMale = 0;
let countMale = 0;
let totalFemale = 0;
let countFemale = 0;

console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

for (let i = 0; i < students.length; i++) {
  let student = students[i];

  let avg = student.math * 0.4 + student.physics * 0.3 + student.cs * 0.3;

  let rank = "";

  if (avg >= 8.0) {
    rank = "Giỏi";
    countGioi++;
  } else if (avg >= 6.5) {
    rank = "Khá";
    countKha++;
  } else if (avg >= 5.0) {
    rank = "Trung bình";
    countTrungBinh++;
  } else {
    rank = "Yếu";
    countYeu++;
  }

  student.avg = avg;
  student.rank = rank;

  if (maxStudent === null || avg > maxStudent.avg) {
    maxStudent = student;
  }

  if (minStudent === null || avg < minStudent.avg) {
    minStudent = student;
  }

  totalMath += student.math;
  totalPhysics += student.physics;
  totalCs += student.cs;

  if (student.gender === "M") {
    totalMale += avg;
    countMale++;
  } else if (student.gender === "F") {
    totalFemale += avg;
    countFemale++;
  }

  console.log(`| ${i + 1} | ${student.name} | ${avg.toFixed(1)} | ${rank} |`);
}

console.log("\nSố sinh viên mỗi xếp loại:");
console.log("Giỏi:", countGioi);
console.log("Khá:", countKha);
console.log("Trung bình:", countTrungBinh);
console.log("Yếu:", countYeu);

console.log("\nSinh viên có điểm TB cao nhất:");
console.log(maxStudent.name + " - " + maxStudent.avg.toFixed(1));

console.log("\nSinh viên có điểm TB thấp nhất:");
console.log(minStudent.name + " - " + minStudent.avg.toFixed(1));

console.log("\nĐiểm TB toàn lớp theo từng môn:");
console.log("Toán:", (totalMath / students.length).toFixed(1));
console.log("Vật lý:", (totalPhysics / students.length).toFixed(1));
console.log("Tin học:", (totalCs / students.length).toFixed(1));

console.log("\nBonus - Điểm TB theo giới tính:");
console.log("Nam:", (totalMale / countMale).toFixed(1));
console.log("Nữ:", (totalFemale / countFemale).toFixed(1));
