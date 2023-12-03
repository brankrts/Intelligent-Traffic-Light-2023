from pymongo import MongoClient


class MongoDBHelper:

    def __init__(self, host='localhost', port=27017, db_name="traffic_lights"):
        try:
            self.client = MongoClient(host, port)
            self.db = self.client[db_name] if db_name else None
            print("Mongo db ile baglanti saglandi")
        except Exception as e:
            raise e

    def insert_one(self, collection_name, document):
        if self.db != None:
            isExist = self.find_one(collection_name, document)
            if isExist is None:
                result = self.db[collection_name].insert_one(document)
                return result
            print("Selected intersection name is already exist")
        else:
            print("Database is not connected.")

    def find_one(self, collection_name, query):

        if self.db != None:
            collection = self.db[collection_name]
            result = collection.find_one(query)
            return result
        else:
            print("Database is not connected.")

    def update_one(self, collection_name, query, update):

        if self.db != None:
            collection = self.db[collection_name]
            result = collection.update_one(query, {"$set": update})
            return result.modified_count
        else:
            print("Database is not connected.")

    def delete_one(self, collection_name, query):

        if self.db != None:
            collection = self.db[collection_name]
            result = collection.delete_one(query)
            return result.deleted_count
        else:
            print("Database is not connected.")

    def close_connection(self):
        if self.client:
            self.client.close()
            print("Connection closed.")
        else:
            print("No connection to close.")
