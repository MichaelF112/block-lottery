;; Start the lottery
(define-public (start-lottery)
  (begin
    ;; Ensure no active lottery is running
    (asserts! (not (var-get lottery-active)) (err u103))
    ;; Activate the lottery
    (var-set lottery-active true)
    (ok u0)
  )
)

;; Trigger the lottery to select a winner and distribute STX
(define-private (trigger-lottery)
  (let ((winner (unwrap! (select-random-winner) (err u104))))
    ;; Transfer all STX to the winner
    (stx-transfer? (var-get stx-pool) (as-contract tx-sender) winner)
    (var-set winner winner)
    (var-set stx-pool u0)
    (var-set participants (list))
    (var-set lottery-active false)
    (ok winner)
  )
)
