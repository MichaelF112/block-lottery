# LOTTERY PLATFORM

This is a decentralized lottery platform built on the Stacks blockchain using Clarity smart contracts. The lottery allows 4 participants to contribute a fixed amount of STX. After a minute, a random participant is selected as the winner and will receive all the STX contributed by the other participants.

## Features

* 4 Participants: Exactly 4 users can participate in the lottery by contributing a fixed amount of STX.
* Random Winner Selection: After all participants have contributed, a random participant is chosen to win the entire STX pool.

* Automated Payout: The selected winner automatically receives the full pool of contributed STX.

## Clarity Contract Overview

The main logic of the lottery is split into several files for better readability:

+ lottery.clar: The main contract that initializes and links to helper functions.
+ functions/helper-functions.clar: Contains utility functions such as random participant selection.
+ functions/lottery-management.clar: Manages starting the lottery, stopping it, and distributing the STX.
+ functions/participants.clar: Handles user contributions and participation logic.
