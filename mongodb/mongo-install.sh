
if [ -f ./init ]
then
    sudo apt update;
    sudo apt install gnupg curl;
    curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
    sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
    --dearmor;
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] \
    https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" \
    | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list;
    sudo apt update;
    sudo apt install -y mongodb-org;
    cp ./init ./mongodb
    sudo mv ./mongodb /etc/init.d/
    sudo chown root:root /etc/init.d/mongodb
    sudo chmod u+x /etc/init.d/mongodb
    sudo service mongodb restart
    sudo chown mongodb:mongodb /var/run/mongod.pid
    sudo service mongodb restart
    sudo service mongodb status
else
    echo "no file named init found in the current directory"
fi
