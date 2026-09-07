package com.salesmanager.shop.application.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.salesmanager.shop.store.api.filter.StorefrontStoreParamInterceptor;


@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Autowired
	private MerchantStoreArgumentResolver merchantStoreArgumentResolver;

	@Autowired
	private LanguageArgumentResolver languageArgumentResolver;

	/**
	 * When set to true, the {@link StorefrontStoreParamInterceptor} enforces that
	 * public storefront API calls include an explicit {@code ?store=} parameter.
	 *
	 * Set to {@code false} during local development if you want the DEFAULT fallback.
	 * Default: true (safe for production multi-pharmacy deployments).
	 */
	@Value("${lylac.storefront.enforce-store-param:true}")
	private boolean enforceStorefrontStoreParam;

	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
		argumentResolvers.add(merchantStoreArgumentResolver);
		argumentResolvers.add(languageArgumentResolver);
	}

	/**
	 * Register the storefront store-param guard interceptor.
	 * Lylac One: enforces multi-pharmacy isolation on public endpoints.
	 */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		if (enforceStorefrontStoreParam) {
			registry.addInterceptor(new StorefrontStoreParamInterceptor())
					.addPathPatterns(
							"/api/v1/products",
							"/api/v1/products/**",
							"/api/v1/product/**",
							"/api/v1/category",
							"/api/v1/category/**",
							"/api/v1/search",
							"/api/v1/search/**"
					)
					// Admin management endpoints are exempt
					.excludePathPatterns(
							"/api/v*/private/**",
							"/api/v*/auth/**"
					);
		}
	}

}
