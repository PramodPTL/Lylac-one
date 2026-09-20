package com.salesmanager.core.services.storefront.Implementation;

import org.springframework.stereotype.Service;
import javax.inject.Inject;
import com.salesmanager.core.model.storefront.StoreSocialLink;
import com.salesmanager.core.repositories.storefront.StoreSocialLinkRepository;
import com.salesmanager.core.services.storefront.Interfaces.StoreSocialService;

@Service
public class StoreSocialServiceImpl extends StorefrontServiceImpl<StoreSocialLink> implements StoreSocialService {
	@Inject public StoreSocialServiceImpl(StoreSocialLinkRepository repository) { super(repository); }
}
