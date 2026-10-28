from db.client import DatabaseClient
from models.schemas import CatalogItemResponse
from services.catalog_service import to_catalog_item_response


class FavouriteService:
    def __init__(self, db: DatabaseClient):
        self.db = db

    def save(self, buyer_id: str, catalog_item_id: int) -> None:
        if not self.db.get_catalog_item_by_id(catalog_item_id):
            raise ValueError("Catalog item not found")
        self.db.save_favourite(buyer_id, catalog_item_id)

    def list_for_user(self, buyer_id: str) -> list[CatalogItemResponse]:
        return [
            to_catalog_item_response(item)
            for item in self.db.list_favourite_items(buyer_id)
        ]
