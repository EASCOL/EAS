from pymongo import MongoClient

class Database:
    client = MongoClient("localhost", 27017)
    db = client.eas

    def get_data(coll, filter_by={}):
        collection = Database.db[f"{coll}"]
        documents = collection.find(filter_by)

        return documents

    def insert_data(coll, data):

        if len(data) < 1:
            raise Exception("No data has been passed for inserting!")

        collection = Database.db[f"{coll}"]
        insertion_id = collection.insert_one(data).inserted_id

        return insertion_id