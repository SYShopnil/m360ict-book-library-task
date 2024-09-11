exports.up = function(knex: { schema: { createTable: (arg0: string, arg1: (table: any) => void) => any; }; }) {
    return knex.schema.createTable('books', (table: { increments: (arg0: string) => { (): any; new(): any; primary: { (): void; new(): any; }; }; string: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; }; text: (arg0: string) => void; date: (arg0: string) => { (): any; new(): any; notNullable: { (): void; new(): any; }; }; integer: (arg0: string) => { (): any; new(): any; unsigned: { (): { (): any; new(): any; references: { (arg0: string): { (): any; new(): any; inTable: { (arg0: string): { (): any; new(): any; onDelete: { (arg0: string): void; new(): any; }; }; new(): any; }; }; new(): any; }; }; new(): any; }; }; }) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description');
      table.date('published_date').notNullable();
      table.integer('author_id').unsigned().references('id').inTable('authors').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex: { schema: { dropTable: (arg0: string) => any; }; }) {
    return knex.schema.dropTable('books');
  };
  