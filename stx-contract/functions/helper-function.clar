;; Helper function to get the number of participants currently in the lottery
(define-read-only (get-participant-count)
  (ok (len (var-get participants)))
)

;; Randomly selects a winner based on block height and number of participants
(define-private (select-random-winner)
  (let ((winner-index (mod (as-max-len u4 (block-height)) PARTICIPANT_LIMIT))
        (all-participants (var-get participants)))
    (ok (at winner-index all-participants))
  )
)
