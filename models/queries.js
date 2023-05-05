const queries = {
    getAllEntries:
        `SELECT id_entry, title, description, image, category, TO_CHAR(date, 'DD/MM/YYYY') AS formatDate, email,
            count(*) OVER() AS total_results  
            FROM entries 
            ORDER BY date DESC
            LIMIT $1
            OFFSET $2`,
    getAllByUser:
        `SELECT id_entry, title, description, image, category, TO_CHAR(date, 'DD/MM/YYYY') AS formatDate, email,
            count(*) OVER() AS total_results
            FROM entries 
            WHERE email=$1
            ORDER BY date DESC
            LIMIT $2
            OFFSET $3`,
    getByCategory: `SELECT id_entry, title, description, image, category, TO_CHAR(date, 'DD/MM/YYYY') AS formatDate, email,
          count(*) OVER() AS total_results 
            FROM entries 
			WHERE category = $1
            ORDER BY date DESC
            LIMIT $2
            OFFSET $3`,
    getById: `SELECT e.id_entry, e.title, e.description, e.image, e.category, e.claimed, TO_CHAR(e.date, 'DD/MM/YYYY') AS formatDate, u.email, u.firstname, u.lastname           FROM entries AS e
            INNER JOIN users AS u
            ON e.email = u.email
           WHERE e.id_entry = $1`,
    searchEntries: `SELECT title, id_entry, description, image, category, TO_CHAR(date, 'DD/MM/YYYY') AS formatDate, email,
           count(*) OVER() AS total_results  
            FROM entries
            WHERE  LOWER(title) LIKE LOWER($1) OR LOWER(description) LIKE LOWER($1)
            LIMIT $2
            OFFSET $3`,

    searchEntriesCategory: `SELECT title, id_entry, description, image, category, TO_CHAR(date, 'DD/MM/YYYY') AS formatDate, email,
           count(*) OVER() AS total_results  
            FROM entries
			WHERE category=$2 
           AND LOWER(title) LIKE LOWER($1) 
		   OR category=$2
		   AND LOWER(description) LIKE LOWER($1)  
            LIMIT $3
            OFFSET $4`,
    updateEntry: `UPDATE entries
            SET title=$1, description=$2, image=$3, category=$4, email=$5, claimed=$6 
            WHERE id_entry=$7`,
    createEntry: `INSERT INTO entries(title,description, image, email, category, claimed)
            VALUES 
            ($1, $2,$3, $4,$5, $6)`,
    deleteEntry: `DELETE 
           FROM entries 
           WHERE id_entry=$1`,
    getAllUsers: `SELECT u.email, u.firstname, u.lastname, u.password, r.role
           FROM users AS u
           INNER JOIN roles AS r
           ON u.email = r.email`,
    getUser: `SELECT u.email, u.firstname, u.lastname, u.password, r.role
               FROM users AS u
               INNER JOIN roles AS r
               ON u.email = r.email
               WHERE u.email=$1`,
    addUser: `INSERT INTO users(email, firstname, lastname, whatsapp, password)
          VALUES
          ($1, $2, $3, $4, $5)`,
    addRole: `INSERT INTO roles(email, role)
          VALUES 
          ($1,$2)`,
    updateUserDetails: `UPDATE users
            SET firstname=$1, lastname=$2, whatsapp=$3, password=$4
            WHERE email=$5`,
    deleteUser: `DELETE 
           FROM users 
           WHERE email=$1`,
    getNumEntries: ` SELECT count(*) FROM entries`,
    getNumEntriesPerUser: `SELECT count(*) FROM entries WHERE email = $1`,
    getNumEntriesSearch: `SELECT count(*) FROM entries WHERE  title LIKE $1 OR content LIKE $1`

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