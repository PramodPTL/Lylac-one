package com.salesmanager.core.services.storefront.Implementation;

import org.springframework.stereotype.Service;
import javax.inject.Inject;
import com.salesmanager.core.model.storefront.StorePage;
import com.salesmanager.core.repositories.storefront.StorePageRepository;
import com.salesmanager.core.services.storefront.Interfaces.StorePageService;

@Service
public class StorePageServiceImpl extends StorefrontServiceImpl<StorePage> implements StorePageService {
	@Inject public StorePageServiceImpl(StorePageRepository repository) { super(repository); }
}
