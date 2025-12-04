function tinhDiem() {
    let cc = Number(document.getElementById("cc").value);
    let tc = Number(document.getElementById("tc").value);
    let fami = Number(document.getElementById("fami").value);
    let gk = Number(document.getElementById("gk").value);
    let ck = Number(document.getElementById("ck").value);

    // Kiểm tra tất cả phải là số
    if (isNaN(cc) || isNaN(tc) || isNaN(fami) || isNaN(gk) || isNaN(ck)) {
        alert("Tất cả các ô nhập phải là số!");
        return;
    }

    if (![ -2, -1, 0, 1 ].includes(cc)) {
        alert("Điểm chuyên cần phải là -2, -1, 0 hoặc 1");
        return;
    }

    if (![0, 0.5, 1].includes(tc)) {
        alert("Điểm tích cực phải là 0, 0.5 hoặc 1");
        return;
    }

    if (fami < 0 || fami > 10) {
        alert("Số bài Đglt đạt phải từ 0 đến 10");
        return;
    }

    if (gk % 2 !== 0 || gk < 0 || gk > 30) {
        alert("Điểm giữa kỳ phải là bội số của 2 từ 0 đến 30");
        return;
    }

    if (![0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10].includes(ck)) {
        alert("Điểm cuối kỳ chỉ nhận .0 hoặc .5 từ 0 đến 10");
        return;
    }

    // ====== TÍNH QT GỐC ======
    let famiScore = (fami / 10) * 2;
    let gkScore = gk * 0.2;

    let qtRaw = cc + tc + famiScore + gkScore;

    // ====== LÀM TRÒN QT THEO .0 / .5 ======
    let intPart = Math.floor(qtRaw);
    let decimal = qtRaw - intPart;

    let qtRounded;
    if (decimal < 0.25) {
        qtRounded = intPart;
    } else if (decimal < 0.75) {
        qtRounded = intPart + 0.5;
    } else {
        qtRounded = intPart + 1;
    }

    // ====== HIỂN THỊ QT ======
    if (qtRaw % 1 === 0) {
        // QT là số .0 → không cần ghi "làm tròn"
        document.getElementById("qt").innerText = qtRaw.toFixed(1);
    } else {
        // QT có số lẻ → ghi rõ cách làm tròn
        document.getElementById("qt").innerText =
            qtRaw.toFixed(1) + " (làm tròn " +
            (qtRounded > qtRaw ? "lên " : "xuống ") +
            qtRounded + ")";
    }

    let qt = qtRounded;

    // ====== XỬ LÝ NẾU QT HOẶC CK < 4 ======
    if (qt < 4 || ck < 4) {
        document.getElementById("ck_out").innerText = ck;
        document.getElementById("hp").innerText = "F";
        document.getElementById("dc").innerText = "F";
        document.getElementById("h4").innerText = 0;
        return;
    }

    // ====== TÍNH ĐIỂM HỌC PHẦN ======
    let hp = (qt + ck) / 2;
    hp = Math.round(hp * 10) / 10;

    let diemChu = "";
    let diem4 = 0;

    if (hp < 4) { diemChu = "F"; diem4 = 0; }
    else if (hp < 5) { diemChu = "D"; diem4 = 1; }
    else if (hp < 5.5) { diemChu = "D+"; diem4 = 1.5; }
    else if (hp < 6.5) { diemChu = "C"; diem4 = 2; }
    else if (hp < 7) { diemChu = "C+"; diem4 = 2.5; }
    else if (hp < 8) { diemChu = "B"; diem4 = 3; }
    else if (hp < 8.5) { diemChu = "B+"; diem4 = 3.5; }
    else if (hp < 9.5) { diemChu = "A"; diem4 = 4; }
    else { diemChu = "A+"; diem4 = 4; }

    document.getElementById("ck_out").innerText = ck;
    document.getElementById("hp").innerText = hp;
    document.getElementById("dc").innerText = diemChu;
    document.getElementById("h4").innerText = diem4;
}
