exports.up = function(knex: { schema: { createTable: (arg0: string, arg1: (table: any) => void) => any; }; }) {
    return knex.schema.createTable('authors', (table: { increments: (arg0: string) => { (): any; new(): any; primary: { (): void; new(): any; }; }; string: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; }; text: (arg0: string) => void; date: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; }; }) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('bio');
      table.date('birthdate').notNullable();
    });
  };
  
  exports.down = function(knex: { schema: { dropTable: (arg0: string) => any; }; }) {
    return knex.schema.dropTable('authors');
  };
  