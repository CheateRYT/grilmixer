
git clone https://github.com/CheateRYT/grilmixer.git

sudo mv grilmixer/grilmixer-frontend /root/client/
sudo mv grilmixer/grilmixer-server /root/server/

sudo rm -rf grilmixer

cd /root/server/grilmixer-server

cat <<EOL > .env
DATABASE_URL="..."
YOOKASSA_TOKEN="..."
SHOP_ID='...'
EOL
