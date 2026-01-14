import { gql } from "@apollo/client";

export const DASHBOARD_ALL_USERS = gql`
  query MyQuery($startDate: timestamptz!, $endDate: timestamptz!) {
    users_aggregate {
      aggregate {
        count
      }
    }
    users(where: { created_at: { _gte: $startDate, _lte: $endDate } }) {
      name
      created_at
      email
    }
  }
`;

export const DASHBOARD_ALL_PARTNERS = gql`
  query MyQuery($startDate: timestamptz!, $endDate: timestamptz!) {
    partners_aggregate {
      aggregate {
        count
      }
    }
    partners(where: { created_at: { _gte: $startDate, _lte: $endDate } }) {
      created_at
      email
      name
    }
  }
`;

export const DASHBOARD_ALL_POSTS = gql`
  query MyQuery($startDate: timestamptz!, $endDate: timestamptz!) {
    posts(where: { created_at: { _gt: $startDate, _lte: $endDate } }) {
      created_at
      id
    }
    posts_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query getAllUsers {
    users(order_by: { created_at: desc }) {
      id
      disabled
      profile_picture_url
      name
      phone
      created_at
      profile_verified
      email
    }
  }
`;

export const GET_ALL_SPECIES = gql`
  query getAllSpecies {
    species(order_by: { species_name: asc }) {
      id
      image_url
      species_name
    }
  }
`;

export const GET_ALL_SERVICES = gql`
  query getAllServices {
    services(order_by: { service_name: asc }) {
      id
      service_name
      image_url
      created_at
    }
  }
`;

export const GET_ALL_PET_SIZES = gql`
  query getAllPetSizes {
    pet_sizes {
      id
      image_url
      size
    }
  }
`;

export const GET_ALL_PET_HAIR_TYPES = gql`
  query getAllPetHairTypes {
    pet_hair_types {
      id
      image_url
      hair_type
    }
  }
`;

export const GET_ALL_BREEDS = gql`
  query getAllSpecies {
    breeds(order_by: { breed_name: asc }) {
      id
      image_url
      breed_name
      species {
        id
        species_name
      }
    }
  }
`;

export const GET_SHOP_PRODUCTS = gql`
  query getShopProducts {
    products(order_by: { created_at: desc }) {
      id
      title
      created_at
      disabled
      product_reviews_aggregate {
        aggregate {
          avg {
            rating
          }
          count
        }
      }
      main_image_url
      sold_amounts
      shop {
        id
        name
        logo_image_url
      }
      product_variants_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const GET_SINGLE_USER = gql`
  query getSingleUser($user_id: uuid!) {
    users_by_pk(id: $user_id) {
      id
      phone
      name
      email
      disabled
      profile_verified
      profile_picture_url
      cover_picture_url
      pets {
        id
        name
        profile_picture_url
        birth_date
        species {
          species_name
        }
        breed {
          breed_name
        }
        gender
        weight
        color
      }
    }
  }
`;

export const GET_SINGLE_SPECIES = gql`
  query getSingleSpecies($species_id: uuid!) {
    species_by_pk(id: $species_id) {
      id
      species_name
      image_url
    }
  }
`;

export const GET_SINGLE_SERVICE = gql`
  query getSingleService($service_id: uuid!) {
    services_by_pk(id: $service_id) {
      id
      service_name
      image_url
    }
  }
`;

export const GET_SINGLE_BREED = gql`
  query getSingleBreed($breed_id: uuid!) {
    breeds_by_pk(id: $breed_id) {
      id
      breed_name
      image_url
      species {
        id
        species_name
        image_url
      }
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query getSinglePost($post_id: uuid!) {
    posts_by_pk(id: $post_id) {
      id
      content
      created_at
      post_media {
        id
        media_url
        media_url
        media_type
        height
        width
        video_thumbnail_url
        video_duration
      }
      comments {
        id
        created_at
        content
        user {
          id
          name
          profile_picture_url
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      favorite_posts_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const GET_ALL_HOME_ADS = gql`
  query getAllHomeAds {
    home_ads {
      id
      image_url
      linking_url
    }
  }
`;

export const GET_SINGLE_HOME_ADS = gql`
  query GET_SINGLE_HOME_ADS($id: uuid!) {
    home_ads_by_pk(id: $id) {
      linking_url
      image_url
    }
  }
`;

export const GET_ALL_SHOP_ADS = gql`
  query MyQuery {
    shopping_ads {
      id
      image_url
      linking_url
    }
  }
`;

export const GET_SINGLE_SHOP_ADS = gql`
  query GET_SINGLE_SHOP_ADS($id: uuid!) {
    shopping_ads_by_pk(id: $id) {
      image_url
      linking_url
    }
  }
`;

export const GET_ALL_SHOPS = gql`
  query GET_ALL_SHOPS {
    shops {
      email
      facebook_page_url
      logo_image_url
      id
      name
      phone1
      phone2
      selected
      address
      about_shop
      cover_image_url
    }
  }
`;

export const GET_PRODUCT_CATEGORIES = gql`
  query getProductCategories {
    product_categories(
      order_by: { category_name: asc }
      where: { category_level: { _eq: 1 } }
    ) {
      id
      category_name
      image_url
      product_categories {
        id
        category_name
        image_url
      }
    }
  }
`;

export const GET_PRODUCT_BRANDS = gql`
  query getProductBrands {
    product_brands(order_by: { brand_name: asc }) {
      id
      brand_name
      logo_image_url
      website_url
    }
  }
`;

export const GET_SHOPS_BY_ID = gql`
  query GET_SHOPS_BY_ID($id: uuid!) {
    shops_by_pk(id: $id) {
      id
      password
      about_shop
      address
      cover_image_url
      email
      facebook_page_url
      logo_image_url
      name
      phone1
      phone2
    }
  }
`;

export const GET_FACILITIES = gql`
  query GET_FACILITIES {
    facilities {
      address
      cover_image_url
      description
      email
      id
      latitude
      logo_image_url
      longitude
      name
      phone
    }
  }
`;

export const GET_FACILITY_PACKAGES = gql`
  query GET_FACILITY_PACKAGES {
    facilities {
      address
      cover_image_url
      description
      email
      id
      latitude
      logo_image_url
      longitude
      name
      phone
      facility_packages_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const GET_FACILITIES_BY_ID = gql`
  query MyQuery($id: uuid!) {
    facilities_by_pk(id: $id) {
      address
      cover_image_url
      description
      email
      id
      latitude
      logo_image_url
      longitude
      name
      password
      phone
      facility_business_hours {
        id
        is_open
        day_of_week
        close_time
        open_time
      }
      facility_species {
        species {
          image_url
          species_name
        }
      }
      facility_services {
        service {
          service_name
          image_url
        }
        created_at
      }
    }
  }
`;

export const GET_ALL_POST = gql`
  query getAllPosts {
    posts(order_by: { created_at: desc }) {
      id
      content
      created_at
      user {
        id
        name
        profile_picture_url
      }
      comments_aggregate {
        aggregate {
          count
        }
      }

      favorite_posts_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const GET_APP_CONFIG = gql`
  query MyQuery {
    app_configs {
      id
      app_background_dark
      app_background_light
      app_version
      card_background_dark
      card_background_light
      color1
      color2
      color3
      color4
      drawer_background_dark
      drawer_background_light
      icon_color_dark
      icon_color_light
      in_maintenance
      input_color_dark
      input_color_light
      primary_dark
      primary_light
      secondary_dark
      secondary_light
      text_color1_dark
      text_color1_light
      text_color2_dark
      text_color2_light
      text_color3_dark
      text_color3_light
    }
  }
`;

export const GET_PRODUCT_BRNADS = gql`
  query GET_SHOP_BRNADS {
    product_brands {
      brand_name
      id
      logo_image_url
      website_url
    }
  }
`;
export const GET_SINGEL_SHOP_BRANDS = gql`
  query MyQuery($id: uuid!) {
    product_brands_by_pk(id: $id) {
      brand_name
      logo_image_url
      website_url
    }
  }
`;

export const GET_ON_BOARDING = gql`
  query MyQuery {
    onboarding {
      id
      image_url
      subtitle
      title
    }
  }
`;

export const GET_SINGLE_ON_BOARDING = gql`
  query MyQuery($id: uuid!) {
    onboarding_by_pk(id: $id) {
      subtitle
      title
      image_url
    }
  }
`;

// ------------------------- Start Partner Queries
export const GET_PARTNERS = gql`
  query GET_PARTNERS {
    partners(order_by: { created_at: desc }) {
      created_at
      disabled
      email
      id?
      name
      phone
    }
  }
`;

export const GET_PARTNER_BY_ID = gql`
  query GET_PARTNER_BY_ID($id: uuid!) {
    partners_by_pk(id: $id) {
      email
      name
      disabled
      created_at
      shop {
        about_shop
        address
        cover_image_url
        created_at
        facebook_page_url
        logo_image_url
        name
        phone1
        phone2
      }
      facility {
        address
        cover_image_url
        created_at
        description
        latitude
        logo_image_url
        longitude
        name
        phone
        selected
      }
    }
  }
`;
// ------------------------- End Partner Queries

// ------------------------- Start Product Category Queries

export const GET_PRODUCT_CATEGORY = gql`
  query GET_PRODUCT_CATEGORY($value: Int!) {
    product_categories(
      where: { category_level: { _eq: $value } }
      order_by: { created_at: desc }
    ) {
      id
      category_level
      category_name
      image_url
      parent_category_id
      product_category {
        category_name
      }
    }
  }
`;

export const GET_PRODUCT_CATEGORY_BY_PK = gql`
  query MyQuery($id: uuid!) {
    product_categories_by_pk(id: $id) {
      category_name
      id
      image_url
      parent_category_id
    }
  }
`;

// ------------------------- Start Product Category Queries
