package com.salesmanager.core.services.storefront.Implementation;

import org.springframework.stereotype.Service;
import javax.inject.Inject;
import com.salesmanager.core.model.storefront.StoreHomepageSection;
import com.salesmanager.core.repositories.storefront.StoreHomepageSectionRepository;
import com.salesmanager.core.services.storefront.Interfaces.StoreHomepageService;

@Service
public class StoreHomepageServiceImpl extends StorefrontServiceImpl<StoreHomepageSection> implements StoreHomepageService {
	@Inject public StoreHomepageServiceImpl(StoreHomepageSectionRepository repository) { super(repository); }
}
