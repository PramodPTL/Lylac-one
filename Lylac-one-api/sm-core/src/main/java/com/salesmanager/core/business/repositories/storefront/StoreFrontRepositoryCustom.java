package com.salesmanager.core.business.repositories.storefront;

import com.salesmanager.core.model.storefront.StoreFrontResponse;

public interface StoreFrontRepositoryCustom {

    StoreFrontResponse getStoreFrontByMerchantId(int merchantId);

    StoreFrontResponse getStoreFrontByStoreCode(String storeCode);
}
