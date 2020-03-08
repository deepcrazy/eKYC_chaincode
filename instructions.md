### Steps for Running the chaincode:

1. Clone `https://github.com/deepcrazy/eKYC_chaincode.git` git repo
2. cd eKYC/javascript and run npm install
3. Move the start_ekyc.sh file to fabric_samples/fabcar/
    * Run chmod 0777 start_ekyc.sh

   ```
   Note 1: move the start_ekyc.sh file and not copy
   ```

   ```
   Note 2: Steps 4-6 are optional. These steps are basically for getting elaborative logs in the docker logs for debugging the errors.
    - If you don't want elaborative logs, then you can skip steps 4-6 and directly proceed with step 7.
   ```

4. cd ~/fabric-samples/first-network/base/
5. vi peer-base.yaml and press `i` key or `INSERT` key of keyboard.
6. Add `- CORE_VM_DOCKER_ATTACHSTDOUT=true` (after line `#- FABRIC_LOGGING_SPEC=DEBUG`) under
   `services: peer-base: image: hyperledger/fabric-peer:$IMAGE_TAG environment:` section.
7. cd ~/fabric-samples/fabcar/
8. Stop all docker container by running `./stopFabric.sh`
9. Run `./start_ekyc.sh javascript`
10. Run `docker exec -it cli bash`
11. Run `Install` command from commands.md file
12. Run `Instantiate` command from commands.md file (If already instantiated, then run `Upgrade` command from commands.md file)
13. Run `Invoke` (Preferred way one) command from commands.md file
