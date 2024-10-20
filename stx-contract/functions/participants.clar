;; Enter the lottery by contributing STX
(define-public (enter-lottery)
  (begin
    (asserts! (var-get lottery-active) (err u100)) ;; Ensure lottery is active
    (asserts! (< (len (var-get participants)) PARTICIPANT_LIMIT) (err u101)) ;; Max 4 participants
    (asserts! (>= (stx-get-balance tx-sender) u1000000) (err u102)) ;; Ensure 1 STX is contributed

    ;; Add participant and transfer STX
    (let ((new-participants (append (var-get participants) (list tx-sender))))
      (var-set participants new-participants)
      (stx-transfer? u1000000 tx-sender (as-contract tx-sender)) ;; Transfer 1 STX to the contract
    )

    ;; If the participant limit is reached, trigger the lottery
    (if (is-eq (len (var-get participants)) PARTICIPANT_LIMIT)
        (ok (trigger-lottery))
        (ok u0))
  )
)
