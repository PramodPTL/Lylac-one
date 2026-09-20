package com.salesmanager.core.repositories.storefront;

import org.springframework.data.jpa.repository.JpaRepository;
import com.salesmanager.core.model.storefront.StorePage;

public interface StorePageRepository extends JpaRepository<StorePage, Long> {
	StorePage findByMerchantIdAndSlugAndPublishedTrue(Integer merchantId, String slug);
	java.util.List<StorePage> findByMerchantIdOrderByIdAsc(Integer merchantId);
}
