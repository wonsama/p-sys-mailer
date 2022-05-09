const { config, mail } = require("./config");
const nodemailer = require("nodemailer");
const moment = require("moment-timezone");
const { execSync } = require("child_process");

function callCommand(cmd, incCommand = true) {
  let results = [];
  if (incCommand) {
    results.push(cmd);
    results.push("--------------------");
  }
  try {
    results.push(execSync(cmd).toString());
  } catch (e) {
    results.push(`exec fail : ${cmd}`);
  }
  if (incCommand) {
    results.push("--------------------");
  }
  return results.join("\n");
}

// 디스크 및 메모리 사용량 반환
function getInfo() {
  // df, free 커맨드가 설치된 곳에서만 동작함
  // windows 용 gitbash 는 df만 설치됨, free는 사용불가
  let results = [];
  results.push(callCommand("df -h"));
  results.push(callCommand("free -h"));
  return results.join("\n");
}

function getMailTemplate() {
  let time = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
  let subject = `[sys_info] ${callCommand("hostname", false)} at ${time}`;

  let _html = [];
  _html.push(getInfo());

  let template = {
    from: mail.from, // 보내는이
    to: mail.to, // 받는이 : 컴마(,) 로 구분하면 여러 사람에게 한번에 메일 발송 가능
    subject,
    html: _html.join("\n").replace(/\n/gi, "<br>"),
  };

  return template;
}

async function main() {
  let transporter = nodemailer.createTransport(config);
  let info = await transporter.sendMail(getMailTemplate());
  console.log("Message sent: %s", info.messageId);
  // console.log(moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss"));
}
main().catch(console.error);
