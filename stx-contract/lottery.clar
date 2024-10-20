(define-constant PARTICIPANT_LIMIT u4)

(define-data-var participants (list 4 principal) (list))
(define-data-var lottery-active bool false)
(define-data-var winner principal 'STX000000000000000000000000000000000000000000)
(define-data-var stx-pool uint u0)

(impl-helper-functions)
(impl-lottery-management)
(impl-participants)
