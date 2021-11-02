# DBO Module

## Cấu trúc thư mục

- project_modules
    - dbo : _Thư mục gốc_
        - index.js
        - AbstractBusiness.js
- dboseeds : _Chứa danh sách các bảng và dữ liệu nạp ban đầu_
    - index.js : _Dùng để nạp và chạy dữ liệu ban đầu_
    - seeds.js : _Dùng để đăng ký danh sách bảng sẽ dùng dưới db_
- dbomigrates : _Chứa các thao tác chỉnh sửa bảng khi cần migrate_
    - index.js : _Dùng để thực thi thao tác_
- code-tools : _Chứa các file thực thi dạng câu lệnh_
    - .cache : _Lưu trữ cache cho việc thực thi câu lệnh_
    - .tml : _Lưu trữ các mẫu file_
    - build-DBOModel : _File thực thi chuyển đổi file cấu hình model dbo.js sang file .js_
    - dbo.js : _File chạy với script npm [npm run dbo](#cac-lenh-thuc-thi)_
    - dbo-migrate : _File thực thi lệnh migrate database [npm run dbo migrate](#dbo-migrate)_
    - dbo-create-model : _File thực thi lệnh tạo model [npm run dbo create-model](#dbo-create-model)_
    - dbo-res-model : _File thực thi lệnh đăng ký model với database [npm run dbo res-model](#dbo-registry-model)_
 
## Các lệnh thực thi

### DBO Migrate

Cú pháp: ```npm run dbo migrate [Options: /update, /force, /nosync, /noseed]```

Vị trí thực thi: Bất kỳ đâu

Giải thích options:

|Tên|Chức năng|Mặc định|
|----|----|----|
|/update|Dùng để chạy các thao tác nằm trong folder dbomigrates, <br />Khi dùng lệnh này database sẽ thay đổi theo các thao tác đã cấu hình|false|
|/force|Dùng để bắt buộc drop bảng trước khi tạo **điều này sẽ làm mất toàn bộ dự liệu**<br />Chỉ hoạt động khi không có /nosunc|false|
|/nosync|Dùng để tắt việc đồng bộ bảng xuống database.<br />**Lưu ý: nếu có bảng mới cần đưa xuống database thì đừng đưa option này vào**|false|
|/noseed|Dùng để tắt việc nạp dự liệu đầu cho các bảng được chứa trong folder dboseeds<br />Nếu không /noseed cho các lần migrate tiếp theo mà không có /force dữ liệu ban đầu sẽ bị ghi đè|false|

### DBO Create Model

Cú pháp: ```npm run dbo create-model MODEL_NAME [Option: TABLE_NAME]```

Vị trí thực thi: cần phải di chuyển vào thư mục chứa model bằng lệnh ```cd PATH```

Ví dụ: 
```cmd
cd client/vnd/models
npm run dbo create-model DemoModel
```

### DBO Registry Model

Cú pháp: ```npm run dbo res-model MODEL_NAME```

Vị trí thực thi: Bất kỳ đâu

**Lưu ý:** Nếu có model trùng tên nhưng khác thư mục, chương trình sẽ hỏi lại để chọn 1 thư mục cụ thể.