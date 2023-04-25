const queries = {
    getAllEntries:
        `SELECT id_entry, title, description, image, category, TO_CHAR(date, 'DD/MM/YYYY') AS formatDate, email
            FROM entries 
            ORDER BY date DESC
            LIMIT $1
            OFFSET $2`,
    getAllByUser:
        `SELECT id_entry, title, description, image, category, TO_CHAR(date, 'DD/MM/YYYY') AS formatDate, email
            FROM entries 
            WHERE email=$1
            ORDER BY date DESC
            LIMIT $2
            OFFSET $3`,
    getByCategory: `SELECT id_entry, title, description, image, category, TO_CHAR(date, 'DD/MM/YYYY') AS formatDate, email
            FROM entries 
			WHERE category = $1
            ORDER BY date DESC
            LIMIT $2
            OFFSET $3`,
    getById: `SELECT e.title, e.description, e.image, e.category, TO_CHAR(e.date, 'DD/MM/YYYY') AS formatDate, u.email, u.firstname, u.lastname           FROM entries AS e
            INNER JOIN users AS u
            ON e.email = u.email
           WHERE e.id_entry = $1`,
    searchEntries: `SELECT title, description, image, category, TO_CHAR(date, 'DD/MM/YYYY') AS formatDate, email
            FROM entries
            WHERE  LOWER(title) LIKE LOWER($1) OR LOWER(description) LIKE LOWER($1)
            LIMIT $2
            OFFSET $3`,
    updateEntry: `UPDATE entries
            SET title=$1, description=$2, image=$3, category=$4, email=$5, claimed=$6 
            WHERE id_entry=$7`,
    createEntry: `INSERT INTO entries(title,description, image, email, category, claimed)
            VALUES 
            ($1, $2,$3, $4,$5, $6)`,
    deleteEntry: `DELETE 
           FROM entries 
           WHERE id_entry=$1`
}



// SELECT e.title, e.description, e.image, e.category, TO_CHAR(e.date, 'DD/MM/YYYY') AS formatDate, u.email, u.firstname, u.lastname
//             FROM entries AS e
//             INNER JOIN users AS u
//             ON e.email = u.email
//             WHERE u.email = 'jose@correo.es'
//             ORDER BY e.date DESC
//             LIMIT '5'
//             OFFSET '0'

module.exports = queries;