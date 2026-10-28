from tests.conftest import login


def favourite_ids(client, headers):
    response = client.get("/api/favourites", headers=headers)
    assert response.status_code == 200, response.text
    return [item["id"] for item in response.json()]


def test_saved_favourite_is_listed(client, demo_headers):
    saved = client.put("/api/favourites/3", headers=demo_headers)

    assert saved.status_code == 200, saved.text
    assert favourite_ids(client, demo_headers) == [3]


def test_saving_twice_keeps_one_favourite(client, demo_headers):
    client.put("/api/favourites/3", headers=demo_headers)

    again = client.put("/api/favourites/3", headers=demo_headers)

    assert again.status_code == 200, again.text
    assert favourite_ids(client, demo_headers) == [3]


def test_saving_an_unknown_product_is_not_found(client, demo_headers):
    response = client.put("/api/favourites/999999", headers=demo_headers)

    assert response.status_code == 404
    assert favourite_ids(client, demo_headers) == []


def test_favourites_are_listed_newest_saved_first(client, demo_headers):
    for catalog_item_id in [5, 2, 8]:
        client.put(f"/api/favourites/{catalog_item_id}", headers=demo_headers)

    assert favourite_ids(client, demo_headers) == [8, 2, 5]


def test_favourites_refuse_shoppers_who_are_not_signed_in(client, anon_headers):
    for headers in [{}, anon_headers]:
        assert client.get("/api/favourites", headers=headers).status_code == 401
        assert client.put("/api/favourites/3", headers=headers).status_code == 401


def test_shoppers_only_see_their_own_favourites(client, demo_headers):
    client.post(
        "/api/auth/register",
        json={"email": "other@example.com", "password": "secret123"},
    )
    other_headers = login(client, email="other@example.com", password="secret123")

    client.put("/api/favourites/3", headers=demo_headers)
    client.put("/api/favourites/7", headers=other_headers)

    assert favourite_ids(client, demo_headers) == [3]
    assert favourite_ids(client, other_headers) == [7]


def test_favourite_shows_the_catalogue_product_and_price(client, demo_headers):
    catalogue = client.get("/api/catalog/items").json()["items"]
    product = next(item for item in catalogue if item["id"] == 3)

    client.put("/api/favourites/3", headers=demo_headers)

    [favourite] = client.get("/api/favourites", headers=demo_headers).json()
    assert favourite == product


def test_adding_a_favourite_to_the_basket_keeps_it_saved(client, demo_headers):
    client.put("/api/favourites/3", headers=demo_headers)

    client.post("/api/basket/items", json={"catalog_item_id": 3}, headers=demo_headers)

    assert favourite_ids(client, demo_headers) == [3]
