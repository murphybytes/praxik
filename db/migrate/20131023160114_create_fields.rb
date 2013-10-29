class CreateFields < ActiveRecord::Migration
  def change
    create_table :fields do |t|
      t.text :data
      t.belongs_to :user

      t.timestamps
    end
  end
end
