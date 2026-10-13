package com.salesmanager.core.business.services.storefront;

import com.salesmanager.core.model.storefront.StoreFrontResponse;

public interface StoreFrontService {

    StoreFrontResponse getStoreFrontByStoreCode(String storeCode);
}
