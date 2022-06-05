# 내 차 팔기 서비스
내 차 팔기 서비스는 소비자가 직접 사러 갈 필요없이 간편하게 온라인에서 등록을 하면 시세정보도 알 수 있고 딜러와 연결이 되는 웹 서비스입니다.

## Introduction

- 내 차 팔기 서비스를 제공하는 Kolon X JustCode 프로젝트
- 개발은 초기 세팅부터 전부 직접 구현했으며,모두 백엔드와 연결하여 dummy data를 이용하여 개발하였습니다.
- 진행 기간 : 2022.05.06 ~ 2022.06.02
- [Back-end GitHub 바로가기](https://github.com/kolonDT/202205_wecode_en)

## DB modeling
![2](https://user-images.githubusercontent.com/21071903/171773721-b6c65832-322d-4090-8aae-7dbf142ff070.png)

## 설치방법
1. git clone https://github.com/kolonDT/202205_wecode_en.git (backend repo를 다운받습니다)
2. .env_SAMPLE -> .env로 수정 후 .env에 백앤드 port, 백앤드 url, 디비 비밀번호, 디비 포트번호를 설정합니다.
3. .env와 docker-compose.yml 파일이 존재하는 경로에서 docker compose up을 수행합니다.
4. localhost:8080 혹은 올라간 frontend서버 아이피 주소:8080로 접속하면 아래와 같은 화면이 뜨면 완료입니다.

![1](https://user-images.githubusercontent.com/21071903/171775063-2c257842-5095-4789-975f-a81da14c359d.png)
