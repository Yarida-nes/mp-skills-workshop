from fastapi import APIRouter, Depends, HTTPException, status

from dependencies import get_favourite_service, require_authenticated_user
from models.schemas import CatalogItemResponse
from services.favourite_service import FavouriteService

router = APIRouter(prefix="/api/favourites", tags=["favourites"])


@router.get("", response_model=list[CatalogItemResponse])
def list_favourites(
    buyer_id: str = Depends(require_authenticated_user),
    service: FavouriteService = Depends(get_favourite_service),
):
    return service.list_for_user(buyer_id)


@router.put("/{catalog_item_id}")
def save_favourite(
    catalog_item_id: int,
    buyer_id: str = Depends(require_authenticated_user),
    service: FavouriteService = Depends(get_favourite_service),
):
    try:
        service.save(buyer_id, catalog_item_id)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc))
