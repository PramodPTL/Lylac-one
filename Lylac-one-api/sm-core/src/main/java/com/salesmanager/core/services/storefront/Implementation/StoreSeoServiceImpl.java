package com.salesmanager.core.services.storefront.Implementation;

import org.springframework.stereotype.Service;
import javax.inject.Inject;
import com.salesmanager.core.model.storefront.StoreSeoConfig;
import com.salesmanager.core.repositories.storefront.StoreSeoConfigRepository;
import com.salesmanager.core.services.storefront.Interfaces.StoreSeoService;

@Service
public class StoreSeoServiceImpl extends StorefrontServiceImpl<StoreSeoConfig> implements StoreSeoService {
	@Inject public StoreSeoServiceImpl(StoreSeoConfigRepository repository) { super(repository); }
}
