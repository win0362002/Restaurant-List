# 我的餐廳清單

一個使用 node.js + express + handlebars 完成的個人美食清單

## 功能描述 (features)

- 使用者可以點擊任一餐廳，查看更多餐廳資訊，如地址、電話、簡介或開啟 google map 查詢路線
- 使用者可以依照中文名稱、英文名稱與餐廳類別進行搜尋
- 使用者可以瀏覽一家餐廳的詳細資訊
- 使用者可以瀏覽全部所有餐廳與其評價

## 環境建置與需求 (prerequisites)

- Node.js v10.15.0
- Express v4.17.1
- Express-handlebars v5.2.0
- nodemon v2.0.6

## 安裝與執行步驟 (installation and execution)

- 使用 Git(Mac OS) 或 Git bash(Windows)

1. 開啟終端機使用 git clone 指令複製專案資料夾到本地端
   ```
   git clone https://github.com/win0362002/Restaurant-List.git
   ```
2. 進入專案資料夾
   ```
   cd restaurant_list
   ```
3. 查看專案內 package.json 檔案中的 dependencies 欄位安裝對應的 npm 套件(package)
   ```
   npm i <package>
   ```
4. 安裝 nodemon 套件

   ```
   npm install -g nodemon
   ```

5. 使用 nodemon 啟動伺服器，執行 app.js 檔案
   ```
   nodemon app.js
   ```
6. 在終端機上看到以下資訊即代表伺服器順利啟動

   ```
   start and listen on http://localhost:3000/
   ```

7. 在瀏覽器的 URL 列輸入 http://localhost:3000 即可進入網頁
