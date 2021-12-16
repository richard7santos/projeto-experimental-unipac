package br.com.metta.service;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.JasperRunManager;

@Service
public class RelatorioDespesasService {
	
	@Value("classpath:reports/relatorio-despesas.jrxml")
	private Resource relatorioDespesasSource;
	
	@Value("classpath:reports/relatorio-despesas.jasper")
	private Resource relatorioDespesasCompilado;
	
	@Autowired
	private DataSource dataSource;
	
	public byte[] gerarRelatorio(Date dataInicio, Date dataFim) {
		try (
			Connection connection = dataSource.getConnection();	
		) {
			Map<String, Object> parametros = new HashMap<>();
			
			parametros.put("DATA_INICIO", dataInicio);
			parametros.put("DATA_FIM", dataFim);
			return JasperRunManager.runReportToPdf(
					relatorioDespesasCompilado.getInputStream(), 
					parametros, 
					connection);
			
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (JRException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	public byte[] gerarRelatorioCompilado() {
		//try with resources
		try (
			Connection connection = dataSource.getConnection();	
		) {
			Map<String, Object> paramentros = new HashMap<>();
			JasperPrint print = JasperFillManager
						.fillReport(relatorioDespesasCompilado.getInputStream(), 
								paramentros, connection);
			return JasperExportManager.exportReportToPdf(print);
			
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (JRException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return null;
	}

	public byte[] gerarRelatorioCompilando() {
		//try with resources
		try (
			Connection connection = dataSource.getConnection();	
		) {
			
			JasperReport compiledReport = JasperCompileManager
									.compileReport(relatorioDespesasSource.getInputStream());
			Map<String, Object> paramentros = new HashMap<>();
			
			JasperPrint print = JasperFillManager
									.fillReport(compiledReport, paramentros, connection);
			
			return JasperExportManager.exportReportToPdf(print);
			
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (JRException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return null;
	}
}