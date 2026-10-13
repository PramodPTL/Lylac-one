package com.salesmanager.core.business.services.storefront;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.salesmanager.core.business.repositories.storefront.StoreFrontRepository;
import com.salesmanager.core.model.storefront.StoreFrontResponse;

@Service("storeFrontService")
public class StoreFrontServiceImp implements StoreFrontService {

    private final StoreFrontRepository storeFrontRepository;

    @Inject
    public StoreFrontServiceImp(StoreFrontRepository storeFrontRepository) {
        this.storeFrontRepository = storeFrontRepository;
    }

    @Override
    public StoreFrontResponse getStoreFrontByStoreCode(String storeCode) {
        return storeFrontRepository.getStoreFrontByStoreCode(storeCode);
    }
}
