package com.salesmanager.core.repositories.storefront;

import org.springframework.data.jpa.repository.JpaRepository;
import com.salesmanager.core.model.storefront.StoreSeoConfig;

public interface StoreSeoConfigRepository extends JpaRepository<StoreSeoConfig, Long> {
	StoreSeoConfig findByMerchantId(Integer merchantId);
}
