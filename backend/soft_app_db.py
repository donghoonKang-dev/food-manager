import pymysql
import time
import os

class soft_app_db:
	def __init__(self):
		self.conn = pymysql.connect(
			user	= os.environ['DBID'],
			passwd	= os.environ['DBPW'],
			host	= os.environ['DBHOST'],
			db	='food_manager',
			charset='utf8'
		)
		self.db = self.conn.cursor(pymysql.cursors.DictCursor)

	def get_ingredient_by_name(self, name):
		if self.db.execute("select * from ingredients where name = %s", name) > 0:
			return self.db.fetchall()[0]

	def get_recipe_by_name(self, name):
		if self.db.execute("select * from recipes where name = %s", name) > 0:
			return self.db.fetchall()[0]

	def get_recipe_ingredient_by_recipe_ingredient(self, recipe_id, ing_id):
		if self.db.execute("select * from recipe_ingredients where recipe_id = %s and ingredient_id = %s", (recipe_id, ing_id)) > 0:
			return self.db.fetchall()[0]

	def insert_ingredient(self, name, hour=None):
		self.db.execute("insert into ingredients(name, hours) values(%s, %s)", (name, hour))
		return self.db.lastrowid

	def insert_recipe(self, name):
		self.db.execute("insert into recipes(name) values(%s)", name)
		return self.db.lastrowid

	def insert_recipe_ingredient(self, recipe_id, ing_id, amount):
		self.db.execute("insert into recipe_ingredients(recipe_id, ingredient_id, grams) values(%s, %s, %s)", (recipe_id, ing_id, amount))
		return self.db.lastrowid

	def commit(self):
		self.conn.commit()
