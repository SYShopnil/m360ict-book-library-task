exports.up = function(knex: { schema: { table: (arg0: string, arg1: (table: any) => void) => any; }; }) {
    return knex.schema.table('authors', function(table: { string: (arg0: string) => { (): any; new(): any; notNullable: { (): { (): any; new(): any; unique: { (): void; new(): any; }; }; new(): any; }; }; }) {
      table.string('email').notNullable().unique();  // Add email column, not nullable, and unique
      table.string('password').notNullable();        // Add password column, not nullable
    });
  };
  
  exports.down = function(knex: { schema: { table: (arg0: string, arg1: (table: any) => void) => any; }; }) {
    return knex.schema.table('authors', function(table: { dropColumn: (arg0: string) => void; }) {
      table.dropColumn('email');     // Rollback: Remove the email column
      table.dropColumn('password');  // Rollback: Remove the password column
    });
  };
  