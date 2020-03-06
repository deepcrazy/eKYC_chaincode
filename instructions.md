### Steps:
1. Clone my git repo
2. cd eKYC/javascript and run npm install
3. Move the start_ekyc.sh file to fabric_samples/fabcar/
    ```
    Note: move the start_ekyc.sh file and not copy
    ```
4. Stop all docker container by running ./stopFabric.sh
5. Run ./start_ekyc.sh javascript
6. docker exec -it cli bash
7. Run ``Install`` command from commands.md file
8. Run ``Upgrade`` command from commands.md file
9. Run ``Invoke`` (Preferred way one) command from commands.md file