# Pantheon 10x Web UI
## Installation guide
Once you have a working build of the duet board (running at least RepRap 2.0.2)
- Download the files within the web_ui folder of the repo
- Replace all files in /www folder with the files in the web_ui folder

## First setup guide
- If on windows download the following [package](https://nodejs.org/en/download/)
- If on linux run the following 

`sudo apt-get update`

`sudo apt-get install nodejs`

`sudo apt-get install npm`

## Developer guide
Edit any files within the developper directory of the repo to change the Duet Web Control 
### To see changes
- Go into local directory of /developper
- Run the following command

`npm run serve`

- Enter the provided localhost url into your preferred browser
### To upload changes
- Go into local directory of /developper
- Run the following command

`npm run build`

- Find the resulting files in the /developper/dist directory
- Replace all files in your working /www directory with said files (not including the zips)

### OR
- Go into local directory of /developper
- Run the following command

`npm run build`

- Find the resulting files in the /developper/dist directory
    - SD for duet 2
    - SBC for duet 3
- Replace all files in your working /www with the files in the dwc1 folder of the directory
- Plug SD card into duet and launch DWC 
- Go into settings and upload the appropiate zip file created by building project

