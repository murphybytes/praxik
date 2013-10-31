class CreateOperations < ActiveRecord::Migration
  def change
    create_table :operations do |t|
      t.belongs_to :field
      t.belongs_to :user
      t.text :data

      t.timestamps
    end
  end
end
