SELECT
    p.*
FROM
    "Post" p
WHERE
    p."postedById" IN (
        SELECT
            uf."followingId"
        FROM
            "UserFollows" uf
        WHERE
            uf."followerId" = $1
        UNION
        SELECT
            $1
    )
AND
    ($2 = 0 OR p."id" > $2)
ORDER BY
    p."likesCount" DESC,
    p."commentsCount" DESC,
    p."createdAt" DESC,
    p."id"
LIMIT $3;