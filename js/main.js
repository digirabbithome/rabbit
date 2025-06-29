// JS 邏輯：Firebase 初始化、登入、登出、打卡、綽號等// 取得今天日期（台灣格式）
const today = new Date();
const formattedDate = today.toLocaleDateString("zh-TW");

// 修改主標題
document.getElementById("mainTitle").textContent = `🎉 數位小兔 ${formattedDate} 工作流程！`;

// 修改按鈕文字
const markButton = document.getElementById("markDone");
markButton.textContent = "🕤 9:30 阿寶交代";

// 綁定打卡事件
markButton.addEventListener("click", async () => {
  const now = new Date();
  const timeString = now.toTimeString().split(" ")[0]; // 取得 HH:MM:SS

  // 儲存到 Firestore
  const docRef = doc(db, "worklog", formattedDate);
  await setDoc(docRef, {
    [currentNickname]: timeString
  }, { merge: true });

  // 顯示完成文字（不換行）
  document.getElementById("completedStatus").textContent = `✔️ ${currentNickname} 在 ${timeString} 完成`;
});
