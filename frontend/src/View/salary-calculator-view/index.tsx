import React, { useState } from 'react';
import {
  Container,
  Title,
  Paper,
  Button,
  Group,
  Text,
  Divider,
  Grid,
  NumberInput,
  Stack,
  Box,
  Switch,
} from '@mantine/core';

// Define interfaces
interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

interface TaxBreakdown {
  bracket: string;
  amount: number;
  taxRate: string;
  taxAmount: number;
}

interface SalaryResult {
  grossSalary: number;
  epfDeduction: number;
  etfContribution: number;
  taxableIncome: number;
  incomeTax: number;
  netSalary: number;
  taxBreakdown: TaxBreakdown[];
  effectiveTaxRate: number;
}

const SalaryCalculator: React.FC = () => {
  // State for form values
  const [grossSalary, setGrossSalary] = useState<number>(0);
  const [epfRate, setEpfRate] = useState<number>(8);
  const [etfRate, setEtfRate] = useState<number>(12);
  const [customRates, setCustomRates] = useState<boolean>(false);
  const [taxBrackets, setTaxBrackets] = useState<TaxBracket[]>([
    { min: 0, max: 100000, rate: 0 },
    { min: 100001, max: 300000, rate: 10 },
    { min: 300001, max: 800000, rate: 15 },
    { min: 800001, max: null, rate: 20 },
  ]);
  
  // State for results
  const [results, setResults] = useState<SalaryResult | null>(null);
  
  // Currency formatter function
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Handle form submission
  const handleCalculate = () => {
    if (grossSalary <= 0) return;
    
    // Calculate EPF (employee contribution)
    const epfDeduction = grossSalary * (epfRate / 100);
    
    // Calculate ETF (employer contribution)
    const etfContribution = grossSalary * (etfRate / 100);
    
    // Taxable income
    const taxableIncome = grossSalary;
    
    // Calculate tax using brackets
    let incomeTax = 0;
    let remainingSalary = taxableIncome;
    const taxBreakdown: TaxBreakdown[] = [];
    
    for (const bracket of taxBrackets) {
      if (remainingSalary <= 0) break;
      
      const min = bracket.min;
      const max = bracket.max;
      const rate = bracket.rate / 100;
      
      // Calculate taxable amount in this bracket
      const taxableAmount = max === null ? 
        remainingSalary : 
        Math.min(remainingSalary, max - min + 1);
      
      if (taxableAmount <= 0) continue;
      
      // Calculate tax for this bracket
      const taxForBracket = taxableAmount * rate;
      
      // Add to breakdown
      taxBreakdown.push({
        bracket: max === null ? 
          `Above ${min.toLocaleString()}` : 
          `${min.toLocaleString()} - ${max.toLocaleString()}`,
        amount: taxableAmount,
        taxRate: `${(rate * 100).toFixed(0)}%`,
        taxAmount: taxForBracket
      });
      
      // Add to total tax
      incomeTax += taxForBracket;
      
      // Reduce remaining salary
      remainingSalary -= taxableAmount;
    }
    
    // Calculate net salary
    const netSalary = grossSalary - epfDeduction - incomeTax;
    
    // Calculate effective tax rate
    const effectiveTaxRate = grossSalary > 0 ? (incomeTax / grossSalary) * 100 : 0;
    
    // Set results
    setResults({
      grossSalary,
      epfDeduction,
      etfContribution,
      taxableIncome,
      incomeTax,
      netSalary,
      taxBreakdown,
      effectiveTaxRate
    });
  };

  // Handle tax bracket rate change
  const handleTaxRateChange = (index: number, value: number) => {
    if (value === undefined) return;
    
    const newBrackets = [...taxBrackets];
    newBrackets[index].rate = value;
    setTaxBrackets(newBrackets);
  };

  return (
    <Container size="md" p="xl">
      <Paper p="xl" shadow="md" radius="md" withBorder mb="xl">
        <Title order={1} align="center" mb="lg">
          Salary Calculator
        </Title>
        
        <Box>
          <Grid>
            <Grid.Col span={12}>
              <Paper p="md" withBorder radius="md" mb="md">
                <Title order={3} mb="md" size="h4">Salary Information</Title>
                <NumberInput
                  label="Monthly Gross Salary (LKR)"
                  placeholder="Enter your monthly gross salary"
                  precision={2}
                  min={0}
                  size="md"
                  value={grossSalary}
                  onChange={(val) => val !== undefined && setGrossSalary(val)}
                  required
                  mb="md"
                  rightSection={<Text size="xs" color="dimmed">LKR</Text>}
                />
              </Paper>
            </Grid.Col>
          </Grid>
          
          <Grid>
            <Grid.Col span={12} md={6}>
              <Paper p="md" withBorder radius="md" mb="md">
                <Title order={3} mb="md" size="h4">Contribution Rates</Title>
                <NumberInput
                  label="EPF Rate (%)"
                  description="Employee Provident Fund contribution percentage"
                  placeholder="Default: 8%"
                  precision={1}
                  min={0}
                  max={20}
                  value={epfRate}
                  onChange={(val) => val !== undefined && setEpfRate(val)}
                  mb="sm"
                />
                
                <NumberInput
                  label="ETF Rate (%)"
                  description="Employer Trust Fund contribution percentage"
                  placeholder="Default: 12%"
                  precision={1}
                  min={0}
                  max={20}
                  value={etfRate}
                  onChange={(val) => val !== undefined && setEtfRate(val)}
                />
              </Paper>
            </Grid.Col>
            
            <Grid.Col span={12} md={6}>
              <Paper p="md" withBorder radius="md" mb="md">
                <Group position="apart" mb="md">
                  <Title order={3} size="h4">Tax Brackets</Title>
                  <Switch
                    label="Custom Tax Rates"
                    checked={customRates}
                    onChange={(event) => setCustomRates(event.currentTarget.checked)}
                  />
                </Group>
                
                {customRates ? (
                  <>
                    <NumberInput
                      label="First Bracket: 0 - 100,000 (%)"
                      precision={1}
                      min={0}
                      max={50}
                      value={taxBrackets[0].rate}
                      onChange={(val) => handleTaxRateChange(0, val as number)}
                      mb="xs"
                    />
                    
                    <NumberInput
                      label="Second Bracket: 100,001 - 300,000 (%)"
                      precision={1}
                      min={0}
                      max={50}
                      value={taxBrackets[1].rate}
                      onChange={(val) => handleTaxRateChange(1, val as number)}
                      mb="xs"
                    />
                    
                    <NumberInput
                      label="Third Bracket: 300,001 - 800,000 (%)"
                      precision={1}
                      min={0}
                      max={50}
                      value={taxBrackets[2].rate}
                      onChange={(val) => handleTaxRateChange(2, val as number)}
                      mb="xs"
                    />
                    
                    <NumberInput
                      label="Fourth Bracket: Above 800,000 (%)"
                      precision={1}
                      min={0}
                      max={50}
                      value={taxBrackets[3].rate}
                      onChange={(val) => handleTaxRateChange(3, val as number)}
                    />
                  </>
                ) : (
                  <Box p="md">
                    <Text>Using default tax rates:</Text>
                    <Text size="sm">• 0 - 100,000: 0%</Text>
                    <Text size="sm">• 100,001 - 300,000: 10%</Text>
                    <Text size="sm">• 300,001 - 800,000: 15%</Text>
                    <Text size="sm">• Above 800,000: 20%</Text>
                  </Box>
                )}
              </Paper>
            </Grid.Col>
          </Grid>
          
          <Group position="center" mt="xl">
            <Button 
              onClick={handleCalculate} 
              size="lg" 
              color="blue"
            >
              Calculate Salary
            </Button>
          </Group>
        </Box>
      </Paper>
      
      {results && (
        <Paper p="xl" shadow="md" radius="md" withBorder>
          <Title order={2} align="center" mb="lg">
            Salary Calculation Results
          </Title>
          
          <Grid>
            <Grid.Col span={12} md={6}>
              <Paper p="md" withBorder radius="md" mb="md">
                <Title order={3} mb="md" size="h4">Salary Breakdown</Title>
                <Stack spacing="sm">
                  <Group position="apart">
                    <Text>Gross Salary:</Text>
                    <Text weight={500}>{formatCurrency(results.grossSalary)}</Text>
                  </Group>
                  <Divider />
                  
                  <Group position="apart">
                    <Text>EPF Deduction ({epfRate}%):</Text>
                    <Text color="red">- {formatCurrency(results.epfDeduction)}</Text>
                  </Group>
                  
                  <Group position="apart">
                    <Text>Income Tax:</Text>
                    <Text color="red">- {formatCurrency(results.incomeTax)}</Text>
                  </Group>
                  <Divider />
                  
                  <Group position="apart">
                    <Text weight={500}>Net Salary:</Text>
                    <Text weight={700} size="lg" color="green">{formatCurrency(results.netSalary)}</Text>
                  </Group>
                  
                  <Box mt="md">
                    <Text size="sm">Employer ETF Contribution ({etfRate}%): {formatCurrency(results.etfContribution)}</Text>
                    <Text size="sm">Effective Tax Rate: {results.effectiveTaxRate.toFixed(2)}%</Text>
                  </Box>
                </Stack>
              </Paper>
            </Grid.Col>
            
            <Grid.Col span={12} md={6}>
              <Paper p="md" withBorder radius="md" mb="md">
                <Title order={3} mb="md" size="h4">Tax Breakdown</Title>
                {results.taxBreakdown.map((bracket, index) => (
                  <Box 
                    key={index} 
                    mb="md" 
                    p="xs" 
                    sx={{ 
                      borderLeft: '3px solid #3498DB', 
                      paddingLeft: '10px', 
                      backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' 
                    }}
                  >
                    <Group position="apart">
                      <Text weight={500}>{bracket.bracket}</Text>
                      <Text weight={500}>Rate: {bracket.taxRate}</Text>
                    </Group>
                    <Group position="apart" mt="xs">
                      <Text size="sm">Taxable Amount: {formatCurrency(bracket.amount)}</Text>
                      <Text size="sm" color="red">Tax: {formatCurrency(bracket.taxAmount)}</Text>
                    </Group>
                  </Box>
                ))}
                
                <Box mt="lg" p="md" sx={{ backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  <Text weight={600}>Summary:</Text>
                  <Text size="sm" mt="xs">
                    Your total income tax is {formatCurrency(results.incomeTax)} on a gross salary 
                    of {formatCurrency(results.grossSalary)}, resulting in a net monthly income 
                    of {formatCurrency(results.netSalary)} after EPF and taxes.
                  </Text>
                </Box>
              </Paper>
            </Grid.Col>
          </Grid>
        </Paper>
      )}
    </Container>
  );
};

export default SalaryCalculator;
