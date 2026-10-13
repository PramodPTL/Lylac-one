package com.salesmanager.core.business.repositories.storefront;

import com.salesmanager.core.model.merchant.MerchantStore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreFrontRepository extends JpaRepository<MerchantStore, Integer>, StoreFrontRepositoryCustom {
}
