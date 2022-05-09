#!/bin/bash

# 제목 : 매일 7시 시스템 정보 메일 발송
# crontab -e 를 통해 확인 가능
# 0 7 * * * /bin/bash $HOME/p-sys-mailer/crontab.sh > $HOME/p-sys-mailer/log/`date "+\%y\%m\%d\%H"`.log 2>&1

cd $HOME/p-sys-mailer
node ./src/app.js