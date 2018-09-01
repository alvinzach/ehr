# Blockchain based electronic health record .

[![Status: Test](https://img.shields.io/badge/status-test-red.svg)](https://github.com/alvinzach/ehr)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

 A private network of hospitals built using ethereum and IPFS . Smart contracts are maintained for each patient to store their diagnosis reports . The smart contracts are deployed when a patient first approches a hospital in the network . Evry diagnosis report is saved in a private ipfs network that runs in the the same network . Hashes of these diagnosis reports are added to patients smart contract against timestamp of diagnosis. Every patient can set an access key to his health record . Only doctors with access code can read and update a patients health record .